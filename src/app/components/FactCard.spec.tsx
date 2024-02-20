import { fireEvent, render, waitFor, act } from "@testing-library/react"
import * as React from "react"
import { addToFav } from "../variables"
import FactCard, { FactCardProps } from "./FactCard";

describe('FactCard', () => {
    const props: FactCardProps = {
        onButtonPress: jest.fn(),
        text: 'cat fact',
        buttonLabel: addToFav,
    }
    const { getByText } = render(<FactCard {...props} />)

    it('should show fact text', () => {
        expect(getByText(props.text)).toBeDefined();
    })

    it('should show button', () => {
        const setState = jest.fn();
        jest
            .spyOn(React, 'useState')
            // @ts-ignore
            .mockImplementationOnce((initState: any) => [initState, setState]);
        render(<FactCard {...props} />);
        const card = getByText(props.text);
        act(() => fireEvent.mouseOver(card));
        expect(getByText(props.buttonLabel)).toBeDefined();
    })

    it('should fire event on button press', () => {
        const setState = jest.fn();
        jest
            .spyOn(React, 'useState')
            // @ts-ignore
            .mockImplementationOnce((initState: any) => [initState, setState]);
        render(<FactCard {...props} />);
        const card = getByText(props.text);
        act(() => fireEvent.mouseOver(card));
        const button = getByText(props.buttonLabel);
        act(() => fireEvent.click(button))
        expect(props.onButtonPress).toHaveBeenCalled();
    })
})


