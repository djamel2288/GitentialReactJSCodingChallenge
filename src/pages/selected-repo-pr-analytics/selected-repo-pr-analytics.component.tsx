import React from 'react'
import {createStructuredSelector} from 'reselect'
import {connect, ConnectedProps} from 'react-redux'
import {
    isRepoListEmptySelector,
    selectedRepoUrlSelector
} from '../../redux/repositories/repositories.selector'
import style from './selected-repo-pr-analytics.module.scss'

export interface SelectedRepoPrAnalyticsComponentProps
    extends SelectedRepoPrAnalyticsComponentPropsFromRedux {
}

function SelectedRepoPrAnalyticsComponent({
                                              selectedRepoUrl,
                                              isRepoListEmpty
                                          }: SelectedRepoPrAnalyticsComponentProps) {

    return (
        <div className={style.container}>

            <div className="text-white my-5">
                TODO: Add a chart and a table
            </div>


            <div className="container">
                <table className="table bg-white table-hover table-striped">
                    <thead className="thead-light">
                    <tr className="text-center">
                        <th scope="col">ID</th>
                        <th scope="col">State</th>
                        <th scope="col">Title</th>
                        <th scope="col">Labels</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Created by</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    selectedRepoUrl: selectedRepoUrlSelector,
    isRepoListEmpty: isRepoListEmptySelector,
})


const connector = connect(mapStateToProps)

export type SelectedRepoPrAnalyticsComponentPropsFromRedux = ConnectedProps<typeof connector>

export default connector(SelectedRepoPrAnalyticsComponent)
