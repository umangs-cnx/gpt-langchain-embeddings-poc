import { Fragment, useEffect, useMemo, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import syllabus from '../syllabus/syllabus';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function UnitDropdown(props: any) {
  const { boardSelected, gradeSelected, setSelectedItem } = props;
  // @ts-ignore
  const grades = syllabus[boardSelected];
  // @ts-ignore
  const gradesInfo = grades[gradeSelected];
  const unitsObject = gradesInfo[props.subjectSelected];
  const menuList = useMemo(() => {
    const units = Object.keys(unitsObject);
    const menuList = units.map((unit) =>
      <Menu.Item key={unit}>
        {({ active }) => (
          <a
            onClick={(e) => setSelectedItem(unit)}
            href="#"
            className={classNames(
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'block px-4 py-2 text-sm'
            )}
          >
            {unit}
          </a>
        )}
      </Menu.Item>
    );
    return menuList;
  }, [setSelectedItem, unitsObject]);
  useEffect(() => {
    if (props.selectedItem) {
      const summary = unitsObject[props.selectedItem].summary;
      const questions = unitsObject[props.selectedItem].suggestedQuestions;
      props.setInitialMessage(summary, questions);
    }
  }, [props, unitsObject]);
  return (
    <Menu as="div" className="w-1/6 relative inline-block text-left mb-2 float-left mr-1">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {props.selectedItem || "Unit"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menuList}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
