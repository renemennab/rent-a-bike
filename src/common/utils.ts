import { RouteComponentProps } from 'react-router-dom'

export function handleGoBack(history: RouteComponentProps['history']): void {
    const currentUrl = history.location.pathname
    const splitUrl = currentUrl.split('/')
    splitUrl.pop()
    const newUrl = splitUrl.join('/')
    history.push(newUrl)
}

export const checkIfFilterMatchesBike = (bike: IBike, searchFilter: string): boolean => {
    if (!searchFilter) return true
    const { model, color, location } = bike
    const matchingValues = [model, color, location].filter(value =>
        value?.toString().toLowerCase().includes(searchFilter.toLowerCase())
    )
    if (matchingValues.length) return true
    return false
}
