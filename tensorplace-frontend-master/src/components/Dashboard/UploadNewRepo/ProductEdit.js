import React, { Component } from "react";
import SimpleReactValidator from 'simple-react-validator';
import { connect } from "react-redux";
import { isEmpty } from 'lodash';

import Snackbar from '../../Shared/Snackbar';
import Siderbar from '../Sidebar';
import codebase from './typeOfCodebase';
import languages from './languages';
import Checkbox from '../../Shared/Checkbox';

import { resetSuccess, getPluginRequest, updatePlugin } from '../../../actions/PluginActions';
import { getSuccess, getPluginDetail } from '../../../reducers/PluginReducer';

const initialState = {
  title: '',
  githubRepoUrl: '',
  codebase: [],
  language: [],
  shortDesc: '',
  longDesc: '',
  inputType: '',
  outputType: '',
  testFile: '',
  expectedOutputFile: '',
  price: '',
  image: '',
  imagePreviewUrl: '',
  dataPopulated: false,
}

class ProductEdit extends Component {
  state = {
    ...initialState,
  }

  constructor(props) {
    super(props);

    this.validator = new SimpleReactValidator({
      messages: {
        required: 'This is the required field'
      },
      element: message => <div className="error-message">{message}</div>,
      validators: {
        array_required: {
          message: 'This is the required field',
          rule: (value) => {
            return value && value.length > 0;
          }
        },
      },
    });
  }

  componentDidMount() {
    this.props.dispatch(getPluginRequest(this.props.match.params.slug));
    // this.populatePlugin(this.props.plugin);
  }

  componentDidUpdate() {
    this.populatePlugin(this.props.plugin);
  }

  componentWillReceiveProps(nextProps) {
    const { success } = nextProps;
    if (this.props.plugin !== nextProps.plugin) {
      this.populatePlugin(nextProps.plugin);
    }

    if (success) {
      setTimeout(() => {
        this.props.dispatch(resetSuccess());
        this.setState(initialState);
      }, 2000);
    }
  }

  populatePlugin = (plugin) => {
    if (!this.state.dataPopulated && !isEmpty(plugin.title)) {
      this.setState({
        ...plugin,
        imagePreviewUrl: plugin.image,
        dataPopulated: true,
      });
    }
  }

  onFieldChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChange = (selectType, name, isChecked) => {
    if (isChecked) {
      this.setState({
        [selectType]: [...this.state[selectType], name]
      })
    } else {
      this.setState(
        prevState => {
          const index = prevState[selectType].indexOf(name)
          if (index > -1) {
            prevState[selectType].splice(index, 1)
          }
          return {
            [selectType]: prevState[selectType],
          }
        }
      )
    }
  }

  fileSelection = (fileType, event) => {

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        [fileType]: file,
        imagePreviewUrl: reader.result,
      });
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  saveApplication = () => {
    if (this.validator.allValid()) {
      const { image, ...rest } = this.state;
      const formData = new FormData();
      formData.append("data", JSON.stringify(rest));
      formData.append("file", this.state.image);
      this.props.dispatch(updatePlugin(formData));
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <>
        <div className="row">
          <div className="col-md-4 col-lg-3 mb-4">
            <Siderbar />
          </div>
          <div className="col-md-8 col-lg-9">
            <div className="page-title">
              <h4>Edit Repository</h4>
            </div>
            <div className="upload-repo-wrap">
              <div className="form-wrap">
                <form>
                  <div className="form-group-top">
                    <label htmlFor="title">Product Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      onChange={this.onFieldChange}
                      value={this.state.title}
                    />
                    {this.validator.message('title', this.state.title, 'required')}
                  </div>
                  <div className="form-group-top">
                    <label htmlFor="githubRepoUrl">Github Repository URL</label>
                    <input
                      type="text"
                      name="githubRepoUrl"
                      className="form-control"
                      onChange={this.onFieldChange}
                      value={this.state.githubRepoUrl}
                    />
                    {this.validator.message('githubRepoUrl', this.state.githubRepoUrl, 'required')}
                  </div>
                  <div className="form-group-top">
                    <label htmlFor="codebase" className="bmd-label-floating">Type of Codebase</label>
                    {
                      codebase.map(item => (
                        <Checkbox
                          name={item.name}
                          checked={this.state.codebase.includes(item.name)}
                          onChange={(e) => this.handleChange('codebase', e.target.name, e.target.checked)}
                          label={item.label}
                          key={item.name}
                        />
                      ))
                    }
                    {this.validator.message('codebase', this.state.codebase, 'required')}
                  </div>
                  <div className="form-group-top">
                    <label htmlFor="language" className="bmd-label-floating">Language</label>
                    {
                      languages.map(item => (
                        <Checkbox
                          name={item.name}
                          checked={this.state.language.includes(item.name)}
                          onChange={(e) => this.handleChange('language', e.target.name, e.target.checked)}
                          label={item.label}
                          key={item.name}
                        />
                      ))
                    }
                    {this.validator.message('language', this.state.language, 'required')}
                  </div>
                  <div className="form-group m-0">
                    <h6>Description</h6>
                  </div>
                  <div className="form-group bmd-form-group">
                    <label htmlFor="shortDesc" className="bmd-label-static">Short Description</label>
                    <textarea
                      className="form-control"
                      name="shortDesc"
                      rows="3"
                      onChange={this.onFieldChange}
                      value={this.state.shortDesc}
                    />
                    {this.validator.message('shortDesc', this.state.shortDesc, 'required')}
                  </div>
                  <div className="form-group bmd-form-group">
                    <label htmlFor="longDesc" className="bmd-label-static">Long Description</label>
                    <textarea
                      className="form-control"
                      name="longDesc"
                      rows="3"
                      onChange={this.onFieldChange}
                      value={this.state.longDesc}
                    />
                    {this.validator.message('longDesc', this.state.longDesc, 'required')}
                  </div>
                  <div className="form-group bmd-form-group">
                    <label htmlFor="inputType" className="bmd-label-static">Input Type</label>
                    <textarea
                      className="form-control"
                      name="inputType"
                      rows="3"
                      onChange={this.onFieldChange}
                      value={this.state.inputType}
                    />
                    {this.validator.message('inputType', this.state.inputType, 'required')}
                  </div>
                  <div className="form-group bmd-form-group">
                    <label htmlFor="outputType" className="bmd-label-static">Output Type</label>
                    <textarea
                      className="form-control"
                      name="outputType"
                      rows="3"
                      onChange={this.onFieldChange}
                      value={this.state.outputType}
                    />
                    {this.validator.message('outputType', this.state.outputType, 'required')}
                  </div>
                  <div className="file-upload-wraper">
                    <label htmlFor="testFile" className="bmd-label-floating">Upload Test File</label>
                    <div
                      className="drop"
                      style={{ border: '3px dashed rgb(218, 223, 227)', background: 'transparent' }}
                    >
                      <div className="count d-flex align-items-center">
                        <button type="button" className="btn btn-raised upload-btn">
                          <i className="fa fa-cloud-upload"></i> Upload
                        </button>
                        <div className="tit">Drag and Drop File</div>
                      </div>
                      <input
                        className="files"
                        type="file"
                        onChange={(e) => this.fileSelection('testFile', e)}
                      />
                    </div>
                    <output className="list">{this.state.testFile.name}</output>
                  </div>
                  <div className="file-upload-wraper">
                    <label htmlFor="expectedOutputFile" className="bmd-label-floating">Upload Expected Output File</label>
                    <div
                      className="drop"
                      style={{ border: '3px dashed rgb(218, 223, 227)', background: 'transparent' }}
                    >
                      <div className="count d-flex align-items-center">
                        <button type="button" className="btn btn-raised upload-btn">
                          <i className="fa fa-cloud-upload"></i> Upload
                        </button>
                        <div className="tit">Drag and Drop File</div>
                      </div>
                      <input
                        className="files"
                        type="file"
                        onChange={(e) => this.fileSelection('expectedOutputFile', e)}
                      />
                    </div>
                    <output className="list">{this.state.expectedOutputFile.name}</output>
                  </div>
                  <div className="file-upload-wraper">
                    <label htmlFor="plugin-icon" className="bmd-label-floating">Product Icon</label>
                    <div className="image">
                      <img src={this.state.imagePreviewUrl} alt="" />
                    </div>
                    <div
                      className="drop"
                      style={{ border: '3px dashed rgb(218, 223, 227)', background: 'transparent' }}
                    >
                      <div className="count d-flex align-items-center">
                        <button type="button" className="btn btn-raised upload-btn">
                          <i className="fa fa-cloud-upload"></i> Upload
                        </button>
                        <div className="tit">Drag and Drop FIles</div>
                      </div>
                      <input
                        className="files"
                        type="file"
                        onChange={(e) => this.fileSelection('image', e)}
                      />
                    </div>
                    <output className="list">{this.state.image && this.state.image.name}</output>
                    {this.validator.message('image', this.state.image, 'required')}
                  </div>
                  <div className="form-group-top">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={this.onFieldChange}
                      value={this.state.price}
                    />
                  </div>
                  <div className="form-group text-right">
                    <button type="button" className="btn btn-raised submit" onClick={this.saveApplication}>Update</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {this.props.success &&
            <Snackbar msg="Plugin update successfully" />
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  success: getSuccess(state),
  plugin: getPluginDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);