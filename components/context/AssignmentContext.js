const { createContext, useState, useContext } = require("react");

const AssignmentContext = createContext();

export function AssignmentProvider({ children, university, logo }) {
    const [universityName, setUniversityName] = useState(university);
    const [universityLogo, setUniversityLogo] = useState(logo);

    const handleName = (name) => {
        setUniversityName(name);
    }
    const handleLogo = (logo) => {
        setUniversityLogo(logo);
    }
    return (
        <AssignmentContext.Provider value={{ universityName, universityLogo, handleName, handleLogo }} >
            {children}
        </AssignmentContext.Provider>
    )
}

export function useAssignmentContext() {
    return useContext(AssignmentContext);
}