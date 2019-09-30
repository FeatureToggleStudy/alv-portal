import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faCircle as farCircle } from '@fortawesome/pro-regular-svg-icons/faCircle';
import { faFileImage as farFileImage } from '@fortawesome/pro-regular-svg-icons/faFileImage';
import { faFilePdf as farFilePdf } from '@fortawesome/pro-regular-svg-icons/faFilePdf';
import { faStar as farStar } from '@fortawesome/pro-regular-svg-icons/faStar';
import { faStickyNote as farStickyNote } from '@fortawesome/pro-regular-svg-icons/faStickyNote';

import { faBalanceScale } from '@fortawesome/pro-solid-svg-icons/faBalanceScale';
import { faBan } from '@fortawesome/pro-solid-svg-icons/faBan';
import { faBuilding } from '@fortawesome/pro-solid-svg-icons/faBuilding';
import { faCalendarAlt } from '@fortawesome/pro-solid-svg-icons/faCalendarAlt';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons/faCaretDown';
import { faBook } from '@fortawesome/pro-solid-svg-icons/faBook';
import { faBinoculars } from '@fortawesome/pro-solid-svg-icons/faBinoculars';
import { faBell } from '@fortawesome/pro-solid-svg-icons/faBell';
import { faBars } from '@fortawesome/pro-solid-svg-icons/faBars';
import { faCaretLeft } from '@fortawesome/pro-solid-svg-icons/faCaretLeft';
import { faCaretRight } from '@fortawesome/pro-solid-svg-icons/faCaretRight';
import { faCaretUp } from '@fortawesome/pro-solid-svg-icons/faCaretUp';
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck';
import { faCircle } from '@fortawesome/pro-solid-svg-icons/faCircle';
import { faChevronUp } from '@fortawesome/pro-solid-svg-icons/faChevronUp';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons/faChevronDown';
import { faEdit } from '@fortawesome/pro-solid-svg-icons/faEdit';
import { faExclamation } from '@fortawesome/pro-solid-svg-icons/faExclamation';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons/faEllipsisV';
import { faCopy } from '@fortawesome/pro-solid-svg-icons/faCopy';
import { faCommentAlt } from '@fortawesome/pro-solid-svg-icons/faCommentAlt';
import { faCog } from '@fortawesome/pro-solid-svg-icons/faCog';
import { faCloudUploadAlt } from '@fortawesome/pro-solid-svg-icons/faCloudUploadAlt';
import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons/faExclamationTriangle';
import { faEye } from '@fortawesome/pro-solid-svg-icons/faEye';
import { faFile } from '@fortawesome/pro-solid-svg-icons/faFile';
import { faFileAlt } from '@fortawesome/pro-solid-svg-icons/faFileAlt';
import { faHandPointRight } from '@fortawesome/pro-solid-svg-icons/faHandPointRight';
import { faHeart } from '@fortawesome/pro-solid-svg-icons/faHeart';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt';
import { faLock } from '@fortawesome/pro-solid-svg-icons/faLock';
import { faKey } from '@fortawesome/pro-solid-svg-icons/faKey';
import { faInfo } from '@fortawesome/pro-solid-svg-icons/faInfo';
import { faHome } from '@fortawesome/pro-solid-svg-icons/faHome';
import { faFileCertificate } from '@fortawesome/pro-solid-svg-icons/faFileCertificate';
import { faFilter } from '@fortawesome/pro-solid-svg-icons/faFilter';
import { faPen } from '@fortawesome/pro-solid-svg-icons/faPen';
import { faPowerOff } from '@fortawesome/pro-solid-svg-icons/faPowerOff';
import { faShare } from '@fortawesome/pro-solid-svg-icons/faShare';
import { faSearch } from '@fortawesome/pro-solid-svg-icons/faSearch';
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons/faQuestionCircle';
import { faPlus } from '@fortawesome/pro-solid-svg-icons/faPlus';
import { faPrint } from '@fortawesome/pro-solid-svg-icons/faPrint';
import { faStickyNote } from '@fortawesome/pro-solid-svg-icons/faStickyNote';
import { faSortDown } from '@fortawesome/pro-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/pro-solid-svg-icons/faSortUp';
import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar';
import { faSort } from '@fortawesome/pro-solid-svg-icons/faSort';
import { faSync } from '@fortawesome/pro-solid-svg-icons/faSync';
import { faUserCheck } from '@fortawesome/pro-solid-svg-icons/faUserCheck';
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons/faSyncAlt';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';
import { faTrash } from '@fortawesome/pro-solid-svg-icons/faTrash';
import { faTrashAlt } from '@fortawesome/pro-solid-svg-icons/faTrashAlt';
import { faUser } from '@fortawesome/pro-solid-svg-icons/faUser';
import { faUserSlash } from '@fortawesome/pro-solid-svg-icons/faUserSlash';
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers';
import { faWrench } from '@fortawesome/pro-solid-svg-icons/faWrench';

@Injectable()
export class IconsLibraryService {

  constructor(private library: FaIconLibrary) {
  }

  init() {
    this.addRegularIcons();
    this.addSolidIcons();
  }

  private addSolidIcons() {
    this.library.addIcons(
      faBalanceScale,
      faBan,
      faBars,
      faBell,
      faBinoculars,
      faBook,
      faBuilding,
      faCalendarAlt,
      faCaretDown,
      faCaretLeft,
      faCaretRight,
      faCaretUp,
      faCheck,
      faChevronDown,
      faChevronUp,
      faCircle,
      faCloudUploadAlt,
      faCog,
      faCommentAlt,
      faCopy,
      faEdit,
      faEllipsisV,
      faEnvelope,
      faExclamation,
      faExclamationTriangle,
      faEye,
      faFile,
      faFileAlt,
      faFileCertificate,
      faFilter,
      faHandPointRight,
      faHeart,
      faHome,
      faInfo,
      faKey,
      faLock,
      faMapMarkerAlt,
      faPen,
      faPlus,
      faPowerOff,
      faPrint,
      faQuestionCircle,
      faSearch,
      faShare,
      faSort,
      faSortDown,
      faSortUp,
      faStar,
      faStickyNote,
      faSync,
      faSyncAlt,
      faTimes,
      faTrash,
      faTrashAlt,
      faUser,
      faUserCheck,
      faUserSlash,
      faUsers,
      faWrench
    );
  }

  private addRegularIcons() {
    this.library.addIcons(
      farCircle,
      farFileImage,
      farFilePdf,
      farStar,
      farStickyNote
    );
  }
}
