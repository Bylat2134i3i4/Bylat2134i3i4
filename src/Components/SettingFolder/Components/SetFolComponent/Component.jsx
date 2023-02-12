import React from 'react';
import SetFolCss from './../../SetFol.module.css';
import classNames from 'classnames';

const Comp = (props) => {
  return (
    <button key={props.id_folder} onClick={() => {props.ChangeCurrentFolder(props.id_folder); props.ChangeColor("bg-yellow-500")}}>
      <div className={classNames(SetFolCss.LeftSide__Folder, props.FolderColor)}>
        {props.name}
      </div>
    </button>
  );
}

export default Comp;