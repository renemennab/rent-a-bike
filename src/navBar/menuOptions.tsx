import React from 'react'
import styled from 'styled-components'
import OptionsList from './optionsList'

interface IProps {
    selectedView: boolean
    setSelectedView: (type: boolean) => void
}
const MenuOptions = function ({ selectedView, setSelectedView }: IProps): JSX.Element {
    return (
        <StyledMenuOptions className={`menuOptions ${selectedView ? 'open' : ''}`}>
            <button type="button" className="menuOptions--header " onClick={() => setSelectedView(false)}>
                <h1 className="menuOptions--header__title">Rent a Bike</h1>
                <i className="fas fa-chevron-left" />
            </button>
            <OptionsList isNav />
        </StyledMenuOptions>
    )
}
export default MenuOptions
const StyledMenuOptions = styled.nav`
    position: absolute;
    left: -100vw;
    top: 0;
    height: 100vh;
    width: 100%;
    background: white;
    padding: 10px 40px;
    transition: all 0.5s ease-in-out;
    overflow: hidden;
    &.open {
        transform: translateX(100vw);
    }
    .menuOptions {
        &--header {
            display: flex;
            border: none;
            background: transparent;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            &__title {
                color: var(--red);
            }
            i {
                color: var(--yellow);
            }
        }
    }
`
