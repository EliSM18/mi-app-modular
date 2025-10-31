import React, { useState, useEffect } from 'react'; // <-- Añade useEffect
import { db } from '../../firebaseConfig'; // <-- Importa la instancia de Firestore
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from "firebase/firestore"; // <-- Importa funciones de Firestore
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  // El estado 'tasks' ahora empieza vacío
  const [tasks, setTasks] = useState([]); 
  const [deletionLogs, setDeletionLogs] = useState([]);
  const [completeLogs, setCompleteLogs] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // --- LEER TAREAS (GET) ---
  // useEffect se ejecutará cuando el componente se monte
  useEffect(() => {
    // 1. Creamos una referencia a nuestra colección "tasks" en Firestore
    const collectionRef = collection(db, "tasks");

    // 2. Creamos una consulta (query) para ordenar las tareas por fecha
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    // 3. onSnapshot es el ¡ESCUCHADOR EN TIEMPO REAL!
    // Se dispara una vez al inicio y luego CADA VEZ que los datos cambian
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ 
          ...doc.data(), 
          id: doc.id // El ID del documento es importante
        });
      });
      setTasks(newTasks); // Actualizamos nuestro estado de React
    });

    // Esta función de limpieza se ejecuta cuando el componente se "desmonta"
    // Evita fugas de memoria
    return () => unsubscribe();

  }, []); // El '[]' asegura que esto se ejecute solo una vez

  // Leer logs de tareas eliminadas
  useEffect(() => {
    const logsRef = collection(db, 'deletion_logs');
    const qLogs = query(logsRef, orderBy('deletedAt', 'desc'));
    const unsubscribeLogs = onSnapshot(qLogs, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ ...doc.data(), id: doc.id });
      });
      setDeletionLogs(logs);
    });

    return () => unsubscribeLogs();
  }, []);
  
  // Leer logs de tareas completadas (completion_logs)
  useEffect(() => {
    const logsRef = collection(db, 'completion_logs');
    const qLogs = query(logsRef, orderBy('completedAt', 'desc'));
    const unsubscribeLogs = onSnapshot(qLogs, (querySnapshot) => {
      const logs = [];
      querySnapshot.forEach((doc) => {
        logs.push({ ...doc.data(), id: doc.id });
      });
      setCompleteLogs(logs);
    });

    return () => unsubscribeLogs();
  }, []);

  // --- AÑADIR TAREA (CREATE) ---
  const handleAddTask = async (e) => { // La hacemos 'async'
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // ¡En lugar de solo 'setTasks', escribimos en la BD!
    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp() // Marca de tiempo de Firebase
    });

    setInputValue('');
    // NOTA: No necesitamos 'setTasks' aquí.
    // ¡'onSnapshot' detectará el nuevo documento y actualizará el estado por nosotros!
  };

  // --- MARCAR TAREA (UPDATE) ---
  const handleToggleComplete = async (task) => { // Pasamos el objeto 'task' entero
    // 1. Creamos una referencia al documento específico por su ID
    const taskRef = doc(db, "tasks", task.id);

    // 2. Actualizamos ese documento
    await updateDoc(taskRef, {
      isComplete: !task.isComplete // Invertimos el valor
    });
    // Registrar en completion_logs si la tarea pasa a completada
    try {
      // Si la tarea NO estaba completa y ahora sí (se acaba de completar)
      if (!task.isComplete) {
        await addDoc(collection(db, 'completion_logs'), {
          taskId: task.id,
          text: task.text ?? null,
          completedAt: serverTimestamp()
        });
      }
    } catch (err) {
      console.warn('Error registrando el completado en completion_logs:', err);
    }
    // De nuevo, ¡onSnapshot se encarga de actualizar la UI!
  };

  // --- BORRAR TAREA (DELETE) ---
  // Ahora acepta un objeto 'task' o solo el 'id' para mantener compatibilidad
  const handleDeleteTask = async (taskOrId) => {
    // Determinar id y (si está) los datos de la tarea
    let taskId = null;
    let taskData = null;

    if (typeof taskOrId === 'string') {
      taskId = taskOrId;
      try {
        const snap = await getDoc(doc(db, 'tasks', taskId));
        if (snap.exists()) taskData = { ...snap.data(), id: snap.id };
      } catch (err) {
        console.warn('No se pudo leer la tarea antes de borrarla:', err);
      }
    } else if (typeof taskOrId === 'object' && taskOrId !== null) {
      taskData = taskOrId;
      taskId = taskOrId.id;
    }

    // Registrar la eliminación en una colección de logs
    try {
      await addDoc(collection(db, 'deletion_logs'), {
        taskId: taskData?.id ?? taskId,
        text: taskData?.text ?? null,
        isComplete: taskData?.isComplete ?? null,
        deletedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('Error registrando la eliminación en deletion_logs:', err);
      // Continuamos con la eliminación aunque falle el log
    }

    // Finalmente borramos el documento original si tenemos id
    if (taskId) {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } else {
      console.warn('No se pudo determinar el id de la tarea para borrarla.');
    }
  };

  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      {/* Formulario para añadir nuevas tareas */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      {/* Lista de tareas */}
      <ul>
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task)} // Pasa el objeto 'task'
            onDeleteTask={handleDeleteTask} // Esta ya pasaba solo el ID
          />
        ))}
      </ul>

      {/* Mensaje cuando no hay tareas */}
      {tasks.length === 0 && (
        <p>No tienes tareas. ¡Añade una nueva!</p>
      )}

      {/* Registros de eliminaciones */}
      <div className="deletion-logs">
        <h3>Registros de eliminaciones</h3>
        {deletionLogs.length === 0 ? (
          <p>No hay registros de eliminaciones.</p>
        ) : (
          <ul>
            {deletionLogs.map(log => (
              <li key={log.id}>
                <span className="log-text">{log.text ?? '(sin texto)'}</span>
                <span className="log-date">{log.deletedAt && log.deletedAt.toDate ? log.deletedAt.toDate().toLocaleString() : '-'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Registros de completados */}
      <div className="completion-logs">
        <h3>Registros de completados</h3>
        {completeLogs.length === 0 ? (
          <p>No hay registros de completados.</p>
        ) : (
          <ul>
            {completeLogs.map(log => (
              <li key={log.id}>
                <span className="log-text">{log.text ?? '(sin texto)'}</span>
                <span className="log-date">{log.completedAt && log.completedAt.toDate ? log.completedAt.toDate().toLocaleString() : '-'}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;