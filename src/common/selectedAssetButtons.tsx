import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { ROUTES } from '../utils'
import ConfirmationDialog from './confirmationDialog'
import { deleteBike } from '../actions/bikeActions'
import { deleteUser } from '../actions/userActions'

interface IProps {
    itemId: string
    itemType: AssetType
}

const SelectedAssetButtons = function ({ itemId, itemType }: IProps): JSX.Element {
    const location = useLocation().pathname
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    function handleDelete(): void {
        if (itemType === 'user') {
            // deletePlace(itemId)
            // history.push(ROUTES.PLACES)
        } else if (itemType === 'bike') {
            dispatch(deleteBike(itemId))
            history.push(ROUTES.BIKES)
        }
        setShowModal(false)
    }

    return (
        <StyledSelectedAssetButtons className="selectedAssetButtons">
            <Link to={`${location}/edit`} className="selectedAssetButtons--edit" aria-label="editar">
                <i className="far fa-edit" />
            </Link>
            <button
                type="button"
                className="selectedAssetButtons--remove"
                onClick={() => setShowModal(true)}
                aria-label="deletar"
            >
                <i className="far fa-trash-alt" />
            </button>
            {showModal ? (
                <ConfirmationDialog onCancel={() => setShowModal(false)} onDelete={() => handleDelete()} />
            ) : null}
        </StyledSelectedAssetButtons>
    )
}
export default SelectedAssetButtons
const StyledSelectedAssetButtons = styled.div`
    width: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    .selectedAssetButtons {
        &--edit,
        &--remove,
        &--favourite {
            padding: 15px;
            background: transparent;
            color: var(--dark-blue);
            border: none;
            font-size: 18px;
            transform: translate(10px, -25%);
        }
        &--remove {
            color: var(--red);
        }
        &--favourite {
            color: var(--dark-gray);
        }
    }
`
