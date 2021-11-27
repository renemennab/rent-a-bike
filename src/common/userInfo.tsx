import React, { Dispatch, SetStateAction } from 'react'
import { StyledInput, StyledLabel } from './styled'

interface IProps {
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    password: string
    setPassword: Dispatch<SetStateAction<string>>
    newPassword?: boolean
}

const UserInfo = function ({ email, setEmail, password, setPassword, newPassword }: IProps): JSX.Element {
    return (
        <>
            <StyledLabel className="column">
                Email
                <StyledInput required type="email" value={email} onChange={event => setEmail(event.target.value)} />
            </StyledLabel>
            <StyledLabel className="column">
                {newPassword ? 'New' : ''} Password
                <StyledInput
                    required={!newPassword}
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </StyledLabel>
        </>
    )
}

UserInfo.defaultProps = {
    newPassword: false
}
export default UserInfo
