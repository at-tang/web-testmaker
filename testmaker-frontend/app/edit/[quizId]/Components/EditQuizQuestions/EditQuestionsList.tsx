'use client'
import { createContext, useContext, useState } from 'react'
import EditQuestion from './EditQuestion';
import { QuizContext } from '../../page';
import AddQuestionButton from './AddQuestionButton';

export const SwapIndexesContext = createContext();

export default function EditQuestionsList() {


    const [quiz] = useContext(QuizContext);

    // Swap indexes is used to facilitate swapping questions
    const [swapIndexes, setSwapIndexes] = useState([-1, -1]) // -1 is used for blank

    return(
        <SwapIndexesContext.Provider value={[swapIndexes, setSwapIndexes]}>

        <div>
                <p>{quiz.questions.length}</p>
            
                {quiz.questions.map((question, i) => (
                    <div key={i} className="">
                        <EditQuestion i={i}/>
                    </div>
                ))}

                <AddQuestionButton/>
                
        </div>
        
        </SwapIndexesContext.Provider>
    )

}