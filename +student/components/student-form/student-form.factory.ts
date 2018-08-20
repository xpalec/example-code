import { Validators } from '@angular/forms';
import { getFieldValue, regex } from '../../../../utils';
import { Student } from '../../model';

export const getProfileFields = (data: Student) => {
  return {
    firstName: [
      getFieldValue(data, 'profile.firstName'),
      [Validators.required],
    ],
    lastName: [
      getFieldValue(data, 'profile.lastName'),
      [Validators.required],
    ],
    localName: [
      getFieldValue(data, 'profile.localName'),
    ],
    dateOfBirth: [
      getFieldValue(data, 'profile.dateOfBirth'),
    ],
    contactNumber: [
      getFieldValue(data, 'profile.contactNumber'),
      [
        Validators.pattern(regex.numbers),
        Validators.minLength(8),
        Validators.maxLength(8),
      ],
    ],
    gender: [
      getFieldValue(data, 'profile.gender'),
      [Validators.required],
    ],
  };
};

export const getStudentFields = (data: Student) => {
  return {
    email: [
      getFieldValue(data, 'email'),
      [
        Validators.required,
        Validators.email,
      ],
    ],
    schoolName: [
      getFieldValue(data, 'schoolName'),
    ],
    schoolLevel: [
      getFieldValue(data, 'schoolLevel'),
    ],
    parent: [
      getFieldValue(data, 'parent'),
      [Validators.required],
    ],
  };
};

export const getEmergencyInfoFields = (data: Student) => {
  return {
    firstName: [
      getFieldValue(data, 'emergencyInfo.firstName'),
    ],
    lastName: [
      getFieldValue(data, 'emergencyInfo.lastName'),
    ],
    localName: [
      getFieldValue(data, 'emergencyInfo.localName'),
    ],
    contactNumber: [
      getFieldValue(data, 'emergencyInfo.contactNumber'),
      [
        Validators.pattern(regex.numbers),
        Validators.minLength(8),
        Validators.maxLength(8),
      ],
    ],
    email: [
      getFieldValue(data, 'emergencyInfo.email'),
    ],
  };
};
