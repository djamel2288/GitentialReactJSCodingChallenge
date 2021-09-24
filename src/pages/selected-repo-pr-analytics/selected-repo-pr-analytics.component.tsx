import React, {useEffect, useState} from 'react'
import {createStructuredSelector} from 'reselect'
import {connect, ConnectedProps} from 'react-redux'
import {
    isRepoListEmptySelector,
    selectedRepoUrlSelector
} from '../../redux/repositories/repositories.selector'
import style from './selected-repo-pr-analytics.module.scss'

import axios from 'axios';
import Search from "../../components/search-bar/search";

import createPlotlyComponent from "react-plotly.js/factory";
import Plotly from 'plotly.js'

import moment from 'moment';

import Moment from 'react-moment';

import 'moment-timezone'

export interface SelectedRepoPrAnalyticsComponentProps
    extends SelectedRepoPrAnalyticsComponentPropsFromRedux {
}

function SelectedRepoPrAnalyticsComponent({
                                              selectedRepoUrl,
                                              isRepoListEmpty
                                          }: SelectedRepoPrAnalyticsComponentProps) {

    const [size, setSize] = useState(100);

    let xAxis: any[] = [];
    let yAxis: any[] = [];

    // const url = "https://api.github.com/repos/kubernetes/kubernetes/pulls";
    const url = selectedRepoUrl + "/pulls?per_page=" + size;
    let [pullReq, setPullReq]: any = useState(null);

    let [filterText, setFilterText] = useState('');

    const Plot = createPlotlyComponent(Plotly);

    useEffect(() => {
        axios.get<any>(url)
            .then(
                rs => {
                    setPullReq(rs.data);
                },
                err => {
                    console.error(err);
                }
            );
    }, [url]);

    if (pullReq) {

        /* get how many pull requests created per day */
        pullReq.forEach((pr: any) => {

            const calendarDay = moment(pr.created_at).format('YYYY-MM-DD');

            const i = xAxis.indexOf(calendarDay);

            if (i !== -1) {
                yAxis.splice(i, 1, yAxis[i] + 1);
            } else {
                xAxis.push(calendarDay);
                yAxis.push(1);
            }

        })

        /* get data from search component */
        const filterCallBack = (index: any) => {
            setFilterText(index);
            filterText = index;
        };

        return (
            <div className="container my-5">

                {/* inputs */}
                <div className="my-3 row">

                    {/* search component */}
                    <div className="col-auto">
                        <Search filterCallBack={filterCallBack}/>
                    </div>

                    {/* select numbre of rows per page */}
                    <div className="col-auto">
                        <input type="number"
                               placeholder="Row per page"
                               onChange={event => setSize((Number)(event!.target!.value))}/>
                    </div>

                </div>

                {/* chart */}
                <div className="row my-5 justify-content-center">

                    <div className="col-auto">
                        <Plot
                            data={[
                                {
                                    type: 'bar',
                                    x: xAxis,
                                    y: yAxis,
                                    name: 'Pull per day'
                                },
                            ]}
                            layout={{title: selectedRepoUrl, autosize: true}}
                            useResizeHandler={true}
                            style={{width: "100%", height: "100%"}}
                            config={{responsive: true}}
                        />
                    </div>

                </div>

                {/* my table */}
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

                    {/* display data using gitHub API */}

                    {/* if filterText.length !== 0, then do filter */}
                    {filterText.length !== 0
                        ? Object.keys(pullReq)
                            .filter(key => pullReq[key].title.toLowerCase().includes(filterText.toLowerCase()))
                            .map(
                                (key: any) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{pullReq[key].id}</th>
                                            <td>{pullReq[key].state}</td>
                                            <td>{pullReq[key].title}</td>
                                            <td>{pullReq[key].labels[0].node_id}</td>
                                            <td>
                                                <Moment format="YYYY/MM/DD">
                                                    {pullReq[key].created_at}
                                                </Moment>
                                            </td>
                                            <td>{pullReq[key].user.login}</td>
                                        </tr>
                                    )
                                }
                            )
                        : Object.keys(pullReq)  // else load all (100) rows */
                            .map(
                                (key: any) => {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{pullReq[key].id}</th>
                                            <td>{pullReq[key].state}</td>
                                            <td>{pullReq[key].title}</td>
                                            {/* for labels I just ge3 the first one because it's an array,
                                                and I can't display all items
                                            */}
                                            <td>{pullReq[key].labels[0].node_id}</td>
                                            <td>
                                                <Moment format="DD-MM-YYYY">
                                                    {pullReq[key].created_at}
                                                </Moment>
                                            </td>
                                            <td>{pullReq[key].user.login}</td>
                                        </tr>
                                    )
                                }
                            )
                    }

                    </tbody>
                </table>
            </div>
        )
    }

    // if no selected repository
    if (isRepoListEmpty) {
        return (
            <div className="text-white">
                <h1>
                    You must select REPOSITORY first :/
                </h1>
            </div>
        )
    }

    // default
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
