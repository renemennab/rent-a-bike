import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ROUTES } from '../utils'
import ConfirmationDialog from '../common/confirmationDialog'

interface IProps {
    itemId: string
    itemType: AssetType
}

const AssetActions = function ({ itemId, itemType }: IProps): JSX.Element {
    const location = useLocation().pathname
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()

    function handleDelete(): void {
        if (itemType === 'user') {
            // deletePlace(itemId)
            // history.push(ROUTES.PLACES)
        } else if (itemType === 'bike') {
            // deleteEvent(itemId)
            // history.push('/')
        }
        setShowModal(false)
    }

    return (
        <StyledAssetActions className="assetActions">
            <button type="button" className="assetActions--favourite" aria-label="adicionar aos favoritos">
                <i className="far fa-star" />
                {/* filled star <i class="fas fa-star"></i> */}
            </button>
            <Link to={`${location}/edit`} className="assetActions--edit" aria-label="editar">
                <i className="far fa-edit" />
            </Link>
            <button
                type="button"
                className="assetActions--remove"
                onClick={() => setShowModal(true)}
                aria-label="deletar"
            >
                <i className="far fa-trash-alt" />
            </button>
            {showModal ? (
                <ConfirmationDialog onCancel={() => setShowModal(false)} onDelete={() => handleDelete()} />
            ) : null}
        </StyledAssetActions>
    )
}
export default AssetActions
const StyledAssetActions = styled.div`
    width: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: var(--padding);
    right: var(--padding);
    .assetActions {
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
