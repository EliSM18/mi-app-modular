import React from "react";
import { render, screen } from "@testing-library/react";
import Error404 from "./Error404";

test("muestra mensaje de error 404", () => {
    render(<Error404 />);
    expect(screen.getByText("Error 404: Página no encontrada")).toBeInTheDocument();
    expect(screen.getByText("Ups! Al parecer la página que buscas no existe.")).toBeInTheDocument();
});