---
dateModified: '2022-02-23'
datePublished: '2010-03-13'
keywords: ['dev', 'C89', 'C']
headline: 'Exploring the tradeoffs of opaque types in C.'
title: 'Opaque types in C89'
---

_This article was written around 2010. It is likely incorrect and I'm unlikely
to revise it significantly._

An opaque type is a user data type, normally a struct, that presents no public
member variable interface.

The following examples were compiled with `gcc -std=c89 -Wall`:

```c
/* opaque.h */
#ifndef __OPAQUE_H__
#define __OPAQUE_H__

struct opaque_type;
typedef struct opaque_type opaque_type;
extern const unsigned sizeof_opaque;

void opaque_init(opaque_type * o, unsigned data);
unsigned opaque_data(const opaque_type * o);

#endif
```

There's no implementation in the above header, only declarations. Clients are
unaware of implementation, their only interface is provided by the function
prototypes.

```c
/* opaque.c */
#include "opaque.h"

struct opaque_type
{
  unsigned data;
};

const unsigned sizeof_opaque = sizeof(opaque_type);

void opaque_init(opaque_type * o, unsigned data)
{
  o->data = data;
}

unsigned opaque_data(const opaque_type * o)
{
  return o->data;
}
```

The above source contains the implementation for the opaque type. This
implementation has file scope and is unknown at compile time to all other files
in the build.

```c
/* main.c */
#include <stdio.h>
#include "opaque.h"

/* not permitted: variable sized type outside function.
unsigned char mem[sizeof_opaque];
*/

opaque_type * o;

int main()
{
  /* not permitted: size unknown.
  opaque_type o;
  */
  unsigned char mem[sizeof_opaque];

  o = (opaque_type *)mem;

  opaque_init(o, 10);
  printf("%u\n", opaque_data(o));

  return 0;
}
```

The above source shows how a client may interface with the opaque type.

Now that we see how most implementations may be written, let's look at a simpler
case. Here's what it would like if we stuffed it all in main.c:

```c
/* main.c */
#include <stdio.h>

/* forward declarations. */
struct opaque_type;
typedef struct opaque_type opaque_type;
extern const unsigned sizeof_opaque;

void opaque_init(opaque_type * o, unsigned data);
unsigned opaque_data(const opaque_type * o);

/* client code. */

/* not permitted: variable sized type outside function.
unsigned char mem[sizeof_opaque];
*/

opaque_type * o;

int main()
{
  /* not permitted: size unknown.
  opaque_type o;
  */
  unsigned char mem[sizeof_opaque];

  o = (opaque_type *)mem;

  opaque_init(o, 10);
  printf("%u\n", opaque_data(o));

  return 0;
}

/* opaque implementation. */

struct opaque_type
{
  unsigned data;
};

const unsigned sizeof_opaque = sizeof(opaque_type);

void opaque_init(opaque_type * o, unsigned data)
{
  o->data = data;
}

unsigned opaque_data(const opaque_type * o)
{
  return o->data;
}
```

The example demonstrates that it is impractical to allocate opaque types at
compile time. Since the `opaque_type` implementation is unknown in main, the
compiler cannot instantiate an object of this type. Hacking around this problem
by making an `opaque_type *` and assigning statically allocated memory works,
but you can only make the allocation in function scope. In systems permitting
dynamic allocation, this may not be an issue. Even an `opaque_ctor()` function
could be defined.

This case also shows there's no partial public / private interfaces possible.
It's all public or all opaque. Consequently, this means that every member
variable to be exposed must have an associated getter and setter function. This
may cause poor code optimization in our multiple file example since the
implementation will be unknown at compile time and the compiler will be unable
to eliminate the overhead of a function call. The exception here is if the
compiler generates intermediate code in the object files to allow for
optimizations in the linking step.
