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
    const [improperQuestions, setImproperQuestions] = useState([]); // A list of indexes where the questions are improperly formatted

    return(
        <SwapIndexesContext.Provider value={[swapIndexes, setSwapIndexes]}>

        <div>

            <AddQuestionButton i={0}/>
            
                {quiz.questions.map((question, i) => (
                    
                    <div key={i} className="mb-4">
                        <EditQuestion i={i}/>
                        <AddQuestionButton i={i}/>
                    </div>
                    
                ))}

                
        </div>
        
        </SwapIndexesContext.Provider>
    )

}