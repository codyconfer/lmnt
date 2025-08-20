// @ts-ignore
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs"

export const history = new ReplaySubject<string>(1000)

history.next("Hi")
history.next("Thing")

history.subscribe({
  // @ts-ignore
  next: value => console.log(`${value}`),
  complete: () => console.log('completed'),
});

history.next("opn")
history.next("cp")
history.next("ls")
history.next("resume")
history.next("abc")
history.next("jjh")
history.next("plpl")
history.next("uy")
