import { useNavigation } from "react-router-dom";


const Submit = ({userbtn}) => {
    const navigation= useNavigation();
    const issubmitted= navigation.state=== 'submitting'
  return (
    <button type='submit' className={`btn btn-block ${userbtn} form-btn`} disabled={issubmitted}> {issubmitted?'submitting':'submit'}</button>
  )
}

export default Submit