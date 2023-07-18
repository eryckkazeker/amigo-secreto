import { render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from "./ListaParticipantes";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";

jest.mock('../state/hook/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()        
    }
})

describe('ListaParticipantes vazia',() => {

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue([]);
    })

    test('lista deve inicializar vazia', () => {
        render(<RecoilRoot>
        <ListaParticipantes/>
        </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem');

        expect(itens).toHaveLength(0);
    });
    
});

describe('ListaParticipantes preenchida',() => {


    const participantes = ['Ana', 'Maria']

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    })

    test('uma lista preenchida com participantes', () => {

        

        render(<RecoilRoot>
                <ListaParticipantes/>
            </RecoilRoot>)

        const itens = screen.queryAllByRole('listitem');

        expect(itens).toHaveLength(participantes.length);
    })
    
});