import BG from "../Components/BG/BG";
import NewAccountEta from "../Components/LOGIN/OUT/NewAccountEta";

import Newaccount from "../Components/LOGIN/OUT/Newaccount";

const New = () => {

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            <BG/>
            <div style={{ flex: 1 }}>
                <NewAccountEta/>
            </div>
            <div style={{ flex: 1 }}>
                <Newaccount/>
            </div>
        </div>
    );
};

export default New;
