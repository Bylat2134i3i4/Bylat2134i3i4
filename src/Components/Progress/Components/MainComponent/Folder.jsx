import React from 'react';
import FolderCss from './Folder.module.css';
import classNames from 'classnames';

const Folder = () => {
  return (
    <div className={FolderCss.Main__Folder_base}>
      <div className={FolderCss.base__Side}>
        <div className={FolderCss.TopSide__TextBlock}>Название папки</div>
        <div className={FolderCss.BottomSide}>
          <div className={FolderCss.BottomSide__LeftTextBlock}>кол-во карточек</div>
          <hr className={FolderCss.BottomSide__hr}/>
          <img className={FolderCss.BottomSide__Img} src="https://andraursuta.com/wp-content/uploads/2017/04/penguin.jpg" alt=""/>
          <div className={FolderCss.BottomSide__RightTextBlock}>username</div>
        </div>
      </div>
      <div className={FolderCss.base__Side}>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-blue-500")}>Новые</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-blue-500 w-1/4")}>25%</div>
          </div>
        </div>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-yellow-500")}>Запоминаемые</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-yellow-500 w-1/4")}>25%</div>
          </div>
        </div>
        <div className={FolderCss.RightBlock__ProgressBlock}>
          <div className={classNames(FolderCss.ProgressBlock__TextBlock, "text-green-500")}>Пройденные</div>
          <div className={FolderCss.ProgressBlock__Block}>
            <div className={classNames(FolderCss.Block__Progress, "bg-green-500 w-1/2")}>50%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Folder;