import * as React from 'react';
import { IUobNewsEventsProps } from './IUobNewsEventsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceGroup, Button, PrimaryButton, DefaultButton, ButtonType, IButtonProps, Nav, Panel, PanelType,  SearchBox, Label, Spinner, SpinnerSize} from 'office-ui-fabric-react';
import { Dropdown} from 'office-ui-fabric-react/lib/Dropdown';
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




var appState ;

export default class UobNewsEvents extends React.Component<IUobNewsEventsProps, any> {


  constructor(props: IUobNewsEventsProps,) {

    super(props);
    this._onFilterChanged = this._onFilterChanged.bind(this);

   this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);


    this.state = {
      selectedItem: null,
      items: null,
      filterText: '',
      cachedData: null,
      loading : false,
      spinner : {'display':'none'},
      feedType : null,
      loadedFeed: null,
      selectBoxValue: null
     
    };
  }



  public render(): JSX.Element {

    //console.log(this.props) ;
    console.log(this.state) ;
    

        var cachedFeed = localStorage.getItem('cacheKey') ;
        var appProps = this.props.feedProp ;
         appState = this.state ;  
        var data ;
        try 
        {
          /*
          if(appProps != null && appState.loadedFeed != appProps)
            {
              console.log("loading from prop") ;
              this.getData(appProps);
            }



          

          /*

          else if (cachedFeed != null && appState.loadedFeed != cachedFeed)
          {
            console.log('Loading from cache ' + ' ' + cachedFeed) 
            this.getData(cachedFeed);
          } 

          else
          {
            console.log("No data and no feed, loading app") ;
          }      
*/


          
         
      }
      catch (error)
      {
        console.log(error) ;
      }
    
        let resultCountText = 1 ;
      
       
        
        return (

          <div>
            <div>
            <h2 className ='ms-font-su'>News and Events</h2>
            </div>

            

            <div>


           <ChoiceGroupImageExample
            controlFunc={this._onImageChoiceGroupChange}

           

           />   



        <ChoiceGroup
        label='Select a category'
        
        options={ [
          {
            key: 'all',
            iconProps: { iconName: 'Globe' },
            text: 'All University'
          },
          {
            key: 'faculty',
            iconProps: { iconName: 'Group' },
            text: 'Faculty'
          }
        ] }
        onChange={ (item) => this.setState(
          {feedType: item.currentTarget.id}) }
        defaultSelectedKey={'all'}
      />
      </div>
      
          <div className='dropdownExample'>
            
          { this.state.feedType === "ChoiceGroup13-faculty" &&
            <Dropdown
              placeHolder='Select an Option'
              
              label='Select a faculty news or events feed:'
              id='Basicdrop1'
              ariaLabel='Basic dropdown example'
              //onChanged={ (item) => this.setState({ selectedItem: item }) }     
              onChanged={ (item) => this.getData(item.key) }
              options= {this.props.facultyArray}
              disabled={appState.loading} />
          }
          { this.state.feedType != "ChoiceGroup13-faculty" &&
            <Dropdown
              placeHolder='Select an Option'
              
              label='Select a news or events feed:'
              id='Basicdrop1'
              ariaLabel='Basic dropdown example'
              
              onChanged={ (item) => this.getData(item.key) }
              //onChanged={ (item) => this.setState({ selectedItem: item }) }     
              options= {this.props.uniArray}
              disabled={appState.loading} />
          }    
          
            </div>
            

            <div className='loading' style={this.state.spinner}> 
              <Spinner size={ SpinnerSize.large } label='Gettings events...' />
           </div>
           
            <FocusZone direction={ FocusZoneDirection.vertical }>
              <TextField label={ 'Filter by title' } onBeforeChange={ this._onFilterChanged } />
              <List
                items={ this.state.items }
                onRenderCell={ (item, index) => (
                  <div className='ms-ListBasicExample-itemCell' data-is-focusable={ true }>
                    
                    <div className='ms-ListBasicExample-itemContent'>
                      <h3 className='ms-fontSize-xl'>{ item.title }</h3>
                      <p className='ms-fontSize-l'>{ item.description }</p>
                      
                    </div>
                    <a href={item.link} target='_blank'>
                    <Icon
                      className='ms-ListBasicExample-chevron'
                      iconName={ getRTL() ? 'ChevronLeft':'ChevronRight' }
                    /></a>
                  </div>
                ) }
              />
            </FocusZone>
            

            <div> 
              <PrimaryButton
                className= { styles.spacer}
                data-automation-id='test'   
                text='Save Selection'
                disabled={appState.loading}
                onClick={this._buttonOnClickHandler.bind(this)}
              />
            </div>
    </div>
    
        );
      }



      _onImageChoiceGroupChange(e: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
         console.log("dropdown changed " + option) ;
    this.setState({ selectBoxValue: option });
   
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

       

        if (this.state.loadedFeed != null)
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
        let showHide = {'display':  'block'};
        
        this.setState({spinner:  showHide, loading: true   
        }) ;
       
        console.log(feed) ;

        


        /*
        this.state.loading = true ;
        this.state.spinner = showHide ;*/
        let items ;



        



          console.log(feed) ;

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
            spinner: showHide,
            loadedFeed: feed,
          }) ;
         
        })
        .catch((error: any): void => {
          console.log(error) ;
        });
      }







  
}

import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface IChoiceGroupImageExampleState {
  selectedKey: string;
}

export class ChoiceGroupImageExample extends React.Component<any, IChoiceGroupImageExampleState> {
  constructor() {
    super();

    this.state = {
      selectedKey: 'bar'
    };

    this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
  }

  public render() {
    let { selectedKey } = this.state;

    return (
      <div>
        <ChoiceGroup 
          label='Pick one image'
          selectedKey={ selectedKey }
          options={ [
          {
            key: 'all',
            iconProps: { iconName: 'Globe' },
            text: 'All University'
          },
          {
            key: 'faculty',
            iconProps: { iconName: 'Group' },
            text: 'Faculty'
          }
        ] }
          onChange={ this.props.controlFunc }
          //onChange={this._onImageChoiceGroupChange}
        />
      </div>
    );
  }

  private _onImageChoiceGroupChange(e: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
    this.setState({
      selectedKey: option.key
    });
  }
}
