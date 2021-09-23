import React, {useEffect, useState} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect, ConnectedProps} from 'react-redux'
import {
    isRepoListEmptySelector,
    selectedRepoUrlSelector
} from '../../redux/repositories/repositories.selector'
import style from './selected-repo-pr-analytics.module.scss'

import axios from 'axios';

export interface SelectedRepoPrAnalyticsComponentProps
    extends SelectedRepoPrAnalyticsComponentPropsFromRedux {
}

function SelectedRepoPrAnalyticsComponent({
                                              selectedRepoUrl,
                                              isRepoListEmpty
                                          }: SelectedRepoPrAnalyticsComponentProps) {

    // const url = "https://api.github.com/repos/kubernetes/kubernetes/pulls";
    const url = selectedRepoUrl + "/pulls";
    // const url = "https://614b5ccfe4cc2900179eb074.mockapi.io/api/v1/product";
    let [pullReq, setPullReq]: any = useState(null);
    useEffect(() => {
        axios.get<any>(url)
            .then(
                rs => {
                    setPullReq(rs.data);
                    console.warn("222222222222222222222222222222222222222222");
                    console.warn(pullReq);
                },
                err => {
                    console.warn("333333333333333333333333333333333333333333");
                    console.error(err);
                }
            );
    }, [url]);

    if (pullReq) {
        return (
            <div className="container my-5">

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
                    {pullReq!.map((req: any, i: any) => (
                        <tr key={`entity-${i}`} data-cy="entityTable">
                            <th scope="row">{req.id}</th>
                            <td>{req.state}</td>
                            <td>{req.title}</td>
                            <td>{req.labels[0].node_id}</td>
                            <td>{req.created_at}</td>
                            <td>{req.user.login}</td>
                        </tr>
                    ))}
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
        )
    }

    if (isRepoListEmpty) {
        return (
            <div className="text-white">
                <h1>
                    kach haja wkhlas :/
                </h1>
            </div>
        )
    }

    return (
        <div className={style.container}>

            <div className="text-white my-5">
                TODO: Add a chart and a table
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
