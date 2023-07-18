import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaParticipantes } from "../state/hook/useListaParticipantes";
import Sorteio from "./Sorteio";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import { act } from "react-dom/test-utils";

jest.mock('../state/hook/useListaParticipantes', () => {
    return {
        useListaParticipantes: jest.fn()        
    }
});
jest.mock('../state/hook/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: jest.fn()        
    }
});

describe('Página de Sorteio', () => {

    const participantes = ['Ana', 'Maria', 'João'];

    const resultado = new Map([
        ['Ana', 'Maria'],
        ['Maria','João'],
        ['João', 'Ana']
    ]); 

    beforeEach(() => {
        (useListaParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
    })

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>);

        const opcoes = screen.queryAllByRole('option');

        expect(opcoes).toHaveLength(participantes.length + 1);
    });

    test('o amigo secreto é exibido quando solicitado', () => {

        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>);

        const select = screen.getByPlaceholderText('Selecione o seu nome');
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        });

        const botao = screen.getByRole('button');
        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole('alert');
        expect(amigoSecreto).toBeInTheDocument();
    });

    test('o nome do amigo secreto some após 5 segundos', () => {

        jest.useFakeTimers();
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>);

        const select = screen.getByPlaceholderText('Selecione o seu nome');
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        });

        const botao = screen.getByRole('button');
        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole('alert');
        expect(amigoSecreto).toBeInTheDocument();
        act(() => {
            jest.runAllTimers()
        });
        expect(amigoSecreto).not.toBeInTheDocument();

    });
});