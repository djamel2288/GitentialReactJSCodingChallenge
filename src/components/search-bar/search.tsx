import React, {useState} from 'react';
import './search.scss';

const Search = ({filterCallBack}: any) => {

    let filterText = useState('');

    const filter = (event: any): any => {
        filterText = event!.target!.value;
        console.warn(filterText);
        filterCallBack(filterText);
    }

    return (
        <div className="search text-white">
            <input id="textFilter"
                   type="text"
                   placeholder="Search..."
                   onChange={event => filter(event)}/>
        </div>
    )
}

export default Search;
