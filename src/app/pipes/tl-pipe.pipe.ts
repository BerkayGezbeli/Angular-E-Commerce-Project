import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tlPipe'
})
export class TlPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    value = value + "₺";
    return value;
  }

}
