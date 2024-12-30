import { Pipe, PipeTransform } from '@angular/core';
import { ForceAny } from '@shared/typescript/utility.types';

@Pipe({
  name: 'callback',
  standalone: false,
})
export class CallbackPipe implements PipeTransform {
  transform(
    items: ForceAny[],
    callback: (item: ForceAny) => boolean
  ): ForceAny {
    if (!items || !callback) return items;
    else return items.filter((item) => callback(item));
  }
}
