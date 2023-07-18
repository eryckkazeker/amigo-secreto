import { render } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import Configuracao from "./Configuracao";

jest.mock('react-router-dom', () => {
    return {
        useNavigate: jest.fn()
    }
});

describe('Pagina de Configuração', () => {
    test('deve ser renderizada corretamente', () => {
        const container = render(<RecoilRoot>
            <Configuracao/>
        </RecoilRoot>);

        expect(container).toMatchSnapshot();


    });
});