import * as React from 'react';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';

export default class UOBSpinner extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        
        <Spinner size={ SpinnerSize.large } label={this.props.labelText}/>
      </div>
    );
  }
}