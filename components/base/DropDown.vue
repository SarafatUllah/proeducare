<template>
  <div class="relative" data-te-dropdown-ref>
    <button
      class="flex items-center whitespace-nowrap rounded-100px bg-transparent px-1 md:px-3 md:pb-1 pt-0.5 md:pt-1.5 text-sm font-bold uppercase leading-normal text-white border border-white"
      type="button"
      id="dropdownMenuButton1"
      data-te-dropdown-toggle-ref
      aria-expanded="false"
      data-te-ripple-init
      data-te-ripple-color="light"
    >
      EN
      <IconsCaretDown class="ml-2 text-white w-3" />
    </button>
    <ul
      class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
      aria-labelledby="dropdownMenuButton1"
      data-te-dropdown-menu-ref
    >
      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
          href="#"
          data-te-dropdown-item-ref
          >English</a
        >
      </li>
      <li>
        <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
          href="#"
          data-te-dropdown-item-ref
          >Bangla</a
        >
      </li>
    </ul>
  </div>
</template>

<script setup></script>
