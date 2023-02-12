import React from 'react';
import FolderCss from './Folder.module.css';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

const Folder = (props) => {
  const CurrentFolder = useSelector(state => state.Autoris.list.folders).filter(el => el.name === props.data.folder_name);
  let News = 0;
  let Now = 0;
  let Good = 0;
  if (CurrentFolder[0].card.length > 0){
    for (let i=0; i<CurrentFolder[0].card.length; i ++){
      if (CurrentFolder[0].card[i].card_type === "новые"){News += 1}
      else{
        if (CurrentFolder[0].card[i].card_type === "изучаемые"){Now +=1}
        else{Good += 1}
      }
    }
    // CurrentFolder.map(el => el.card.map(val => {
    //   if (val.card_type === "новые"){News += 1}
    //   else{
    //     if (val.card_type === "изучаемые"){Now +=1}
    //     else{Good += 1}
    //   }
    // }))
    News = Math.floor(News/CurrentFolder[0].card.length * 100);
    Now = Math.floor(Now/CurrentFolder[0].card.length * 100);
    Good = Math.floor(Good/CurrentFolder[0].card.length * 100);
  }

  return (
    <div className={FolderCss.Main__Folder_base}>
      <div className={FolderCss.base__Side}>
        <div className={FolderCss.TopSide__TextBlock}>{props.data.folder_name}</div>
        <div className={FolderCss.BottomSide}>
          <div className={FolderCss.BottomSide__LeftTextBlock}>{props.data.emount}</div>
          <hr className={FolderCss.BottomSide__hr}/>
          <img className={FolderCss.BottomSide__Img} src={props.data.icon} alt=""/>
          <div className={FolderCss.BottomSide__RightTextBlock}>{props.data.user_name}</div>
        </div>
      </div>
      <div className={FolderCss.base__Side}>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-blue-500")}>Новые</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-blue-500")} style={News===0 ? {width: 10+'%'} : {width: News+'%'}}>{News}%</div>
          </div>
        </div>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-yellow-500")}>Запоминаемые</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-yellow-500")} style={Now===0 ? {width: 10+'%'} : {width: Now+'%'}}>{Now}%</div>
          </div>
        </div>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-green-500")}>Пройденные</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-green-500")} style={Good===0 ? {width: 10+'%'} : {width: Good+'%'}}>{Good}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;