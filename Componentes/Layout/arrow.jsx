//arrow svg
export default function Arrow({color}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="arrow-svg" height="48px" viewBox="0 -960 960 960" width="48px" fill={color} onClick={()=>{
            history.back();
        }}><path d="M400-80 0-480l400-400 56 57-343 343 343 343-56 57Z" /></svg>
    )
}