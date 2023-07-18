import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Rodape from "./Rodape";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";

const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('../state/hook/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()        
    }
});

jest.mock('../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
});

jest.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
});

describe('Rodape quando não existem participantes suficientes', () => {

    const participantes = ['João', 'Maria'];

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    })

    test('a brincadeira não pode ser iniciada', () => {

        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)

        const botao = screen.getByRole('button');

        expect(botao).toBeDisabled();
    });

});

describe('Rodape quando existem participantes suficientes', () => {

    const participantes = ['Ana', 'Maria', 'João', 'Pedro'];

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
    })

    test('a brincadeira pode ser iniciada', () => {
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)

        const botao = screen.getByRole('button');

        expect(botao).not.toBeDisabled();
    });

    test('a brincadeira foi iniciada', () => {
        render(<RecoilRoot>
            <Rodape/>
        </RecoilRoot>)

        const botao = screen.getByRole('button');

        expect(botao).not.toBeDisabled();

        fireEvent.click(botao);

        expect(mockNavegacao).toHaveBeenCalledTimes(1);
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');
        expect(mockSorteio).toHaveBeenCalledTimes(1);
    });

});