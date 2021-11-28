import { RouteComponentProps } from 'react-router-dom'

export function handleGoBack(history: RouteComponentProps['history']): void {
    const currentUrl = history.location.pathname
    const splitUrl = currentUrl.split('/')
    splitUrl.pop()
    const newUrl = splitUrl.join('/')
    history.push(newUrl)
}

export default handleGoBack
