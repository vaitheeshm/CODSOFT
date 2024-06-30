import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function SearchComponent(){

    const [keyword,setKeyword] = useState("");

    const navigate = useNavigate();

    const handlerFunction = () => {
        navigate('search?keyword='+keyword)
    }

    return <div className="col-12 col-md-6 mt-2 mt-md-0">
    <div className="input-group">
        <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Search ..."
            onBlur={handlerFunction}
            onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
            <button id="search_btn" className="btn" onClick={handlerFunction}>
                <i className="fa fa-search" aria-hidden="true"></i>
            </button>
        </div>
    </div>
</div>
}