import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
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
  faUsers,
  faUserSlash,
  faWrench
} from '@fortawesome/pro-solid-svg-icons';

import {
  faCircle as farCircle,
  faFileImage as farFileImage,
  faFilePdf as farFilePdf,
  faStar as farStar,
  faStickyNote as farStickyNote,
} from '@fortawesome/pro-regular-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class IconLibraryService {

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
