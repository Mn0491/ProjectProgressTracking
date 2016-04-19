import React ,{ Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createMileStone } from '../../../actions/MilestoneAction';
import { submitForm, clearFormData } from '../../../actions/ProjectFormActions';
import MilestonesInput from '../components/milestonesComponent';

class ProjectForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      projectName: ""
    }

    this.projectNameHandler = this.projectNameHandler.bind(this)
    this.milestoneOnHandleChange = this.milestoneOnHandleChange.bind(this)
    this.renderMilstonesInput = this.renderMilstonesInput.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidUpdate(){
    if(this.props.form.submit == true){
      this.props.clearFormData();
      this.context.router.push('/projects');
    }
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render(){
    return(
      <form className={css(styles.formContainer)}>
        <div className={`form-group`}>
          <label className={css(styles.label)}>Project Name</label>
          <input placeholder="Name..." type="text" className={`form-control ${css(styles.inputStyle)}`}
            value={this.state.projectName} onChange ={(event) => this.projectNameHandler(event)} />
        </div>
        {this.props.form.milestoneKeys.map((key) => this.renderMilstonesInput(key))}
        <img className={css(styles.addImage)} src="images/Add.png" onClick={() => this.milestoneOnHandleChange()}/>
        <button className={css(styles.button)} onClick={()=> this.submitHandler()} >Submit</button>
      </form>
    )
  }

  projectNameHandler(event){
    this.setState({
      projectName: event.target.value
    })
  }

  milestoneOnHandleChange(){
    this.props.createMileStone()
    console.log(this.props)
  }

  renderMilstonesInput(key){
      return <MilestonesInput key={key} id={key} fetchProjectDets={false}/>
  }

  submitHandler(){
    const data = {
      projectName: this.state.projectName,
      milestones: this.props.form.milestones
    }
    console.log('submit data',data)

    this.props.submitForm(data)
  }
}

function mapStateToProps(state){
  return {
    form: state.form,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ createMileStone, submitForm, clearFormData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);

const styles = StyleSheet.create({
  formContainer: {
    minWidth: 1000,
    marginTop: 50
  },
  label: {
    fontFamily: 'avenir next',
    color: '#666666'
  },
  inputStyle: {
    borderRadius: 0,
    borderColor: '#CCCCCC',
    fontFamily: 'avenir next'
  },
  button: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    fontFamily: 'avenir next',
    fontWeight: 'lighter',
    padding: 5,
    color: '#666666',
    textDecoration: 'none',
    float: 'right',
    marginTop: 30
  },
  addImage: {
    height: 20,
    cursor: 'pointer'
  }
})
