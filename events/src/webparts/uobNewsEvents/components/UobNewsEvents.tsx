import * as React from 'react';
import { IUobNewsEventsProps } from './IUobNewsEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, IChoiceGroupOption, Button, PrimaryButton, DefaultButton, ButtonType, IButtonProps, Nav, Panel, PanelType,  SearchBox, Label, Spinner, SpinnerSize} from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType} from 'office-ui-fabric-react/lib/Dropdown';
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import {
  css,
  getRTL
} from 'office-ui-fabric-react/lib/Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { List } from 'office-ui-fabric-react/lib/List';
import styles from './UobNewsEvents.module.scss';
import UOBChoiceGroup from './subcomponents/choicegroup' ;
import UOBDropdown from './subcomponents/dropdown' ;
import UOBList from './subcomponents/list' ;
import UOBSpinner from './subcomponents/spinner' ;




var appState ;

export default class UobNewsEvents extends React.Component<IUobNewsEventsProps, any> {


  constructor(props: IUobNewsEventsProps,) {

    super(props);

    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onUOBChoiceGroupChange = this._onUOBChoiceGroupChange.bind(this);
    this._onUOBDropdownChange = this._onUOBDropdownChange.bind(this);


    this.state = {
      selectedItem: null,
      items: null,
      filterText: '',
      cachedData: null,
      loading : false,
      spinnerVisible: false,
      feedType : null,
      loadedFeed: null
    };
  }

  appState = this.state ;
  componentDidMount()
  {
    var appProps = this.props.feedProp ;
    var cachedFeed = localStorage.getItem('cacheKey') ;
    var appProps = this.props.feedProp ;
      

    if (cachedFeed != null)
      {
        console.log('Loading from cache ' + ' ' + cachedFeed) 
        this.getData(cachedFeed);
      } 
   

    else if(appProps != null)
      {
        console.log("loading from prop") ;
        this.getData(appProps);
      }
    
  }



  public render(): JSX.Element {
        let resultCountText = 1 ;
        return (

          <div>
            <div>
            <h2 className ='ms-font-su'>News and Events</h2>
            </div>
            <UOBChoiceGroup getValue={this._onUOBChoiceGroupChange}/>

            { this.state.feedType === "faculty" &&
            <UOBDropdown 
             buildOptions={this.props.facultyArray}
             labelText ={'Select a faculty news or events feed:'}
             getSelectedItem ={this._onUOBDropdownChange} 
          
            />
            }
            
            { this.state.feedType != "faculty" &&
              <UOBDropdown 
              buildOptions={this.props.uniArray}
              labelText={'Select a news or events feed:'} 
              getSelectedItem ={this._onUOBDropdownChange} 
            />
            }
            { this.state.spinnerVisible
              ? <UOBSpinner labelText={"Getting Events..."} />
              : null
            }
           
           
            <UOBList
            items={this.state.items}
            filterChanged={ this._onFilterChanged }
            loading={this.state.spinner} />
              

            
            
            

            <div> 
              <PrimaryButton
                className= { styles.spacer}
                data-automation-id='test'   
                text='Save Selection'
                disabled={this.state.loading}
                onClick={this._buttonOnClickHandler.bind(this)}
              />
            </div>
    </div>
    
        );
      }



      _onUOBChoiceGroupChange(e: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
        console.log(this) ;
    this.setState({ feedType: option.key });
  }

  _onUOBDropdownChange(item) {
    //this.setState({ selectedItem: item.key });
    this.getData(item.key)
    //setState({ feedType: e.key });
}
    


      private _onFilterChanged(text: string) {
        let data = this.state ;
        let items = this.state.items ;
        let cachedData = this.state.cachedData ;
    
       // console.log(items) ;
    
        try {

          if(text === null || text === "")
            {
              this.setState({items: cachedData })
            }
            else
            {
              this.setState({
                filterText: text,
                items: text ?
                  items.filter(item => item.title.toLowerCase().indexOf(text.toLowerCase()) >= 0) :
                  items
              });

            } 
      }
      catch (error)
      {
        console.log(error) ;
      }
      }
    
    
      private _buttonOnClickHandler() {

       

        if (this.state.items != null)
        {
          let cacheVal = this.state.loadedFeed ;
          localStorage.setItem("cacheKey", cacheVal);
          alert("Your feed preferences have been saved") ;
        }
        else
        {
          alert("Please select a feed before clicking save") ;
        }    
       

        return false;
      }
    
      private _navOnClickHandler() {
        alert('You clicked the edit button in navigation');
        return false;
      }
    
      private _showPanel() {
        this.setState({ showPanel: true });
      }
    
      private _closePanel() {
        this.setState({ showPanel: false });
      }
    
     
    
      private getData(feed)
      {
        this.setState({spinnerVisible: !this.state.spinnerVisible}); 
        let items ;
        this.props.HttpClient.get("https://spfx-getevents.azurewebsites.net/?feed="+feed,
        HttpClient.configurations.v1, {
          mode: 'cors'
        })
        .then((response: HttpClientResponse): Promise<any> => {
    
            return response.text();      
        })
        .then((data: any): void => {
          
          var events = JSON.parse(data) ;
          let showHide = {'display':'none'};
          items = events.items ;
          

         
          
          this.setState({
            items: items,
            cachedData: items,
            selectedItem: null,
            loading: false,
            spinnerVisible: false,
          }) ;
         
        })
        .catch((error: any): void => {
          console.log(error) ;
        });
      }







  
}