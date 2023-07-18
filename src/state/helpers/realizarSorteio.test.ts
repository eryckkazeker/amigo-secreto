import React from "react";
import { realizarSorteio } from "./realizarSorteio";

describe('Dado um sorteio de amigo secreto', () => {

    test('cada participante não sorteie o proprio nome', () => {
        const participantes = ['Ana', 'Maria', 'João', 'Pedro'];

        const sorteio = realizarSorteio(participantes);

        participantes.forEach(participante => {
            const amigoSecreto = sorteio.get(participante);
            expect(amigoSecreto).not.toEqual(participante);
        })
    });
});