'use client'
import { useContext } from 'react'
import EditQuestion from './EditQuestion';
import { QuizContext } from '../../page';
import AddQuestionButton from './AddQuestionButton';

export default function EditQuestionsList() {


    const [quiz] = useContext(QuizContext);

    return(
        <div>
                <p>{quiz.questions.length}</p>
            
                {quiz.questions.map((question, i) => (
                    <div key={i} className="">
                        <EditQuestion i={i}/>
                    </div>
                ))}

                <AddQuestionButton/>
                
        </div>
    )

}