import React from 'react';
import DatePicker from 'react-datepicker';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import '../styles/datepicker.scss';
import es from '../assets/locale/es-la';
registerLocale('es', es);
setDefaultLocale('es');

function DateTime(props) {
  const dateOf =
    props.value === undefined || props.value === null
      ? new Date()
      : new Date(props.value);
  const handleChange = e => {
    props.onChange({ target: { name: props.name, value: e } });
  };

  return (
    <React.Fragment>
      <DatePicker
        className={props.className || 'form-control form-control-sm t-c'}
        name={props.name}
        selected={dateOf}
        showTimeSelect={props.showTimeSelect}
        timeFormat={props.timeFormat || 'hh:mm aa'}
        timeIntervals={props.timeIntervals || 15}
        timeCaption={props.timeCaption || 'Hora'}
        popperClassName={props.popperClassName || 'datetimepicker-left'}
        popperPlacement={props.popperPlacement || 'bottom-start'}
        popperModifiers={props.popperModifiers || {}}
        data-placement="right"
        dateFormat={
          props._state === '0'
            ? props.showTimeSelect
              ? 'dd/MM/yyyy hh:mm aa'
              : 'dd/MM/yyyy'
            : props.dateFormat || 'dd/MM/yyyy hh:mm aa'
        }
        fixedHeight
        showPopperArrow={false}
        disabled={props._state !== '0'}
        onChange={handleChange}
      />
    </React.Fragment>
  );
}

export default DateTime;
