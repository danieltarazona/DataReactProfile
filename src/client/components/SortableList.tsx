import React from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface SortableListProps<T> {
    items: T[];
    onReorder: (items: T[]) => void;
    renderItem: (item: T) => React.ReactNode;
}

/**
 * Generic Sortable List component using @dnd-kit.
 */
export function SortableList<T extends { id: string }>({ items, onReorder, renderItem }: SortableListProps<T>) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Avoid accidental drags
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex(it => it.id === active.id);
            const newIndex = items.findIndex(it => it.id === over.id);
            const reordered = arrayMove(items, oldIndex, newIndex);
            onReorder(reordered);
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                    {items.map(item => (
                        <SortableItem key={item.id} id={item.id}>
                            {renderItem(item)}
                        </SortableItem>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}

interface SortableItemProps {
    id: string;
    children: React.ReactNode;
}

/**
 * Sortable Item wrapper with handle.
 */
function SortableItem({ id, children }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="group relative">
            <div
                {...attributes}
                {...listeners}
                className="absolute -left-8 top-1/2 -translate-y-1/2 p-2 cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <GripVertical size={18} />
            </div>
            {children}
        </div>
    );
}
