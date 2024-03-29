import { Injectable } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faAddressBook as farAddressBook,
  faCircle as farCircle,
  faFileImage as farFileImage,
  faFilePdf as farFilePdf,
  faListAlt as farListAlt,
  faStar as farStar,
  faStickyNote as farStickyNote
} from '@fortawesome/pro-regular-svg-icons';

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
  faListAlt,
  faListUl,
  faLock,
  faMapMarkerAlt,
  faPen,
  faPlus,
  faPowerOff,
  faPrint,
  faQuestionCircle,
  faSearch,
  faSearchPlus,
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
  faTrashAlt, faUnlink,
  faUser,
  faUserCheck,
  faUsers,
  faUserSlash,
  faWrench
} from '@fortawesome/pro-solid-svg-icons';

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
      faSearchPlus,
      faListAlt,
      faListUl,
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
      faWrench,
      faUnlink
    );
  }

  private addRegularIcons() {
    this.library.addIcons(
      farAddressBook,
      farCircle,
      farFileImage,
      farFilePdf,
      farStar,
      farListAlt,
      farStickyNote
    );
  }
}
