import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    NewRepositoryAdditionType,
    RepositoryDataType
} from '../../services/http/repositories/repositories.types'


export interface RepositoriesDataState {
    repoList: Array<RepositoryDataType>
    selectedRepoUrl: string
}

const initialState: RepositoriesDataState = {
    repoList: [],
    selectedRepoUrl: ''
}


const repositoriesSlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {
        addRepositoryToState: (state, action: PayloadAction<NewRepositoryAdditionType>) => {
            state.repoList.push(action.payload)
        },
        selectRepository: (state, action: PayloadAction<string>) => {
            state.selectedRepoUrl = action.payload
        }
    }
})

export const {
    addRepositoryToState,
    selectRepository
} = repositoriesSlice.actions

export default repositoriesSlice.reducer
