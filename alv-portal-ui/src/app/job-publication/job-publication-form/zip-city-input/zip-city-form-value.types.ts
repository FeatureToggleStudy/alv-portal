import { TypeaheadItem } from '../../../shared/forms/input/typeahead/typeahead-item';
import { ZipAndCity } from '../../../shared/localities/zip-and-city-typeahead-item';


export type ZipCityFormValue = ZipAndCity | TypeaheadItem<ZipAndCity>;
