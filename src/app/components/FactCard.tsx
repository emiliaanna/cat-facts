import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

export interface FactCardProps {
    text: string;
    onButtonPress: () => void;
    buttonLabel: string;
}

const StyledCard = styled(Card)`
    margin-bottom: 2em;
`;

const StyledTypography = styled(Typography)`
    overflow-wrap: break-word;
`

export default function FactCard(props: FactCardProps) {
    const { text, onButtonPress, buttonLabel } = props;
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseOver = () => {
        setIsVisible(true)
    };

    const handleMouseOut = () => {
        setIsVisible(false)
    }

    return (
        <StyledCard
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
        >
            <CardContent>
                <StyledTypography>
                    {text}
                </StyledTypography>
            </CardContent>
            {isVisible && (
                <CardActions>
                    <Button onClick={onButtonPress}>
                        {buttonLabel}
                    </Button>
                </CardActions>
            )}

        </StyledCard>
    )

}