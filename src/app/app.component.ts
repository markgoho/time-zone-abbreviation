import { DatePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'timezoneAbbreviation',
})
export class TimezoneAbbreviationPipe implements PipeTransform {
  transform(value: Date): string {
    const timeZone = value.toString().match(/\(([A-Za-z\s].*)\)/);
    const longName = timeZone && timeZone[1] ? timeZone[1] : 'GMT';
    console.log({ timeZone, longName });
    return this.abbreviateTimeZone(longName);
  }

  abbreviateTimeZone(name: string): string {
    return name
      .split(/\s+/)
      .map((word) => word[0])
      .join('')
      .toUpperCase();
  }
}

@Pipe({
  standalone: true,
  name: 'altAbbreviation',
})
export class AltAbbreviationPipe implements PipeTransform {
  browserLanguage = navigator.language;

  transform(value: Date): Intl.DateTimeFormatPart | string {
    const options: Intl.DateTimeFormatOptions = {
      timeZoneName: 'shortGeneric',
    };

    const timeZoneParts: Intl.DateTimeFormatPart[] = new Intl.DateTimeFormat(
      this.browserLanguage,
      options
    ).formatToParts(value);

    const timeZoneName = timeZoneParts.find(
      (value) => value.type === 'timeZoneName'
    );

    return timeZoneName !== undefined ? timeZoneName.value : '???';
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AltAbbreviationPipe, DatePipe],
  template: `
    <h1>Hello from Codespaces!</h1>

    <div>
      {{ epochTime | date : 'EEEE, MMMM d, y, h:mm:ss a' }}
      {{ epochTime | altAbbreviation }}
    </div>
  `,
})
export class AppComponent {
  epochTime: Date = new Date();
}
