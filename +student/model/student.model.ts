import { ProfileData } from '../../core/auth/model';
import { QueryList } from '../../store/query';
import { Parent } from '../../+parent/model';

export interface EmergencyInformations {
  firstName?: string;
  lastName?: string;
  localName?: string;
  contactNumber?: string;
  email?: string;
}

export interface Student {
  id?: string;
  parent?: Parent;
  schoolName?: string;
  schoolLevel?: string;
  profile?: ProfileData;
  email?: string;
  emergencyInformations?: EmergencyInformations;
}

export type Students = QueryList<Student[]>;
