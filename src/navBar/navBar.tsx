import React from 'react'
import styled from 'styled-components'

interface IProps {
    selectedView: string
    setSelectedView: (type: string) => void
}
const NavBar = function ({ selectedView, setSelectedView }: IProps): JSX.Element {
    return (
        <StyledNavBar className="navBar">
            <button
                type="button"
                className={`navBar--list ${selectedView === `list` ? `selected` : ``}`}
                onClick={() => setSelectedView(`list`)}
            >
                <i className="fas fa-list" />
                <span>Lista</span>
            </button>
            <button
                type="button"
                className={`navBar--list ${selectedView === `map` ? `selected` : ``}`}
                onClick={() => setSelectedView(`map`)}
            >
                <i className="far fa-map" />
                <span>Map</span>
            </button>
            <button type="button" className="navBar--list" onClick={() => setSelectedView(`menu`)}>
                <i className="fas fa-chevron-up" />
                <span>Menu</span>
            </button>
        </StyledNavBar>
    )
}
export default NavBar

const StyledNavBar = styled.nav`
    display: flex;
    justify-content: space-around;
    height: 60px;
    .navBar {
        &--list,
        &--map,
        &--menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: none;
            border: none;
            width: 90px;
            color: var(--dark-blue);
            i {
                margin-bottom: 5px;
                color: var(--yellow);
            }
            &.selected {
                border-bottom: 5px solid var(--dark-blue);
            }
        }
    }
`
