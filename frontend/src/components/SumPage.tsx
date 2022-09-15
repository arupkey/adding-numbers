import React, {useState} from "react";
import axios from '../services/api';

interface INums {
    num1: number | null;
    num2: number | null;
}

export function SumPage(){

    const [nums, setNums] = useState<INums>({
        num1: null,
        num2: null
    });

    const [resultCaption, setResultCaption] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setNums((prevNums) => ({
          ...prevNums, [name]: value
        }));
        setResultCaption("");
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log(nums);
        if(nums.num1 != null && nums.num2 != null){
            axios.get("http://localhost:9898/api/sums"+"?num1="+nums.num1+"&num2="+nums.num2).then((res) => {
            console.log(Number(res.data));
            console.log(isNaN(Number(res.data)));
            if(isNaN(Number(res.data))){
                    setResultCaption(res.data);
                }else{
                    setResultCaption("Sum is " + res.data);
                }
                
            });
            // axios.post("http://localhost:9898/api/sums", nums).then((res) => {
            //     console.log(res);
            // });
        }else{
            setResultCaption('Both numbers submitted are not numbers or are using invalid format!');
        }
    }


    return(
        <div>
            <h1>Adding Two Numbers</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="autocomplete-input">Number 1: </label>
                <input alt="Number 1 Input Box" className="autocomplete" id="autocomplete-input" name="num1" onChange={handleChange} type="number" value={nums.num1 || ''}/>
                <br></br>
                <br></br>
                <label htmlFor="autocomplete-input">Number 2: </label>
                <input alt="Home Phone Input Box" className="autocomplete" id="autocomplete-input" name="num2" onChange={handleChange} type="number" value={nums.num2 || ''}/>
                <br></br>
                <br></br>
                <button type="submit">Get Sum</button>
            </form>
            <p>{resultCaption}</p>
        </div>
    );
}